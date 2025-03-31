use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::HashMap;

type EvidenceDB = HashMap<String, (String, String)>; // CaseNo -> (Username, FileHash)

#[init]
fn init() {
    let _: Result<(EvidenceDB,), _> = storage::stable_restore();
    if storage::stable_restore::<(EvidenceDB,)>().is_err() {
        let empty_db: EvidenceDB = HashMap::new();
        storage::stable_save((&empty_db,)).unwrap();
    }
}
#[update]
fn upload_evidence(case_no: String, id: String, hash: String) -> String {
    let mut db: EvidenceDB = storage::stable_restore::<(EvidenceDB,)>()
        .unwrap_or_else(|_| (HashMap::new(),))
        .0;

    if db.contains_key(&case_no) {
        return "Error: Case number already exists".to_string();
    }

    db.insert(case_no, (id, hash));
    storage::stable_save((&db,)).unwrap();

    "Evidence uploaded".to_string()
}

#[query]
fn verify_evidence(case_no: String, hash: String) -> String {
    let db: EvidenceDB = storage::stable_restore::<(EvidenceDB,)>()
        .unwrap_or_else(|_| (HashMap::new(),))
        .0;

    match db.get(&case_no) {
        Some((id, stored_hash)) if stored_hash == &hash => {
            format!("Verified. Uploaded by: {}", id)
        }
        Some(_) => "Error: File hash does not match".to_string(),
        None => "Error: Case not found".to_string(),
    }
}