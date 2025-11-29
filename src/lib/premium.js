export const PREMIUM_EMAILS = ['jdjchelp@gmail.com', 'simonejohnson840@gmail.com'];

export const isPremiumUser = (user) => {
    if (!user || !user.email) return false;
    return PREMIUM_EMAILS.includes(user.email);
};
