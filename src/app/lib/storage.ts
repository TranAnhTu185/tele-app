interface ReferralData {
    referrals: { [userId: string]: string[] };
    referredBy: { [userId: string]: string };
}

const storage: ReferralData = {
    referrals: {},
    referredBy: {}
};


export function saveReferral(userId: string, referrerId: string) {
    if(!storage.referrals[referrerId]) {
        storage.referrals[referrerId] = [];
    }
    storage.referrals[referrerId].push(userId);
    storage.referredBy[userId] = referrerId;
}

export function getReferrals(uesrId: string): string[] {
    return storage.referrals[uesrId] || [];
}

export function getReferrer(uesrId: string): string | null {
    return storage.referredBy[uesrId] || null;
}