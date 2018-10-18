export const OPEN_SOCIAL_MODAL = "OPEN_SOCIAL_MODAL";
export const CLOSE_SOCIAL_MODAL = "CLOSE_SOCIAL_MODAL";
export const TOGGLE_SOCIAL_MODAL = "TOGGLE_SOCIAL_MODAL";

export const openSocialModal = () => ({ type: OPEN_SOCIAL_MODAL });
export const closeSocialModal = () => ({ type: CLOSE_SOCIAL_MODAL });
export const toggleSocialModal = () => ({ type: TOGGLE_SOCIAL_MODAL });

export const OPEN_COUPON_MODAL = "OPEN_COUPON_MODAL";
export const CLOSE_COUPON_MODAL = "CLOSE_COUPON_MODAL";
export const TOGGLE_COUPON_MODAL = "TOGGLE_COUPON_MODAL";

export const openCouponModal = payload => ({
  type: OPEN_COUPON_MODAL,
  payload
});
export const closeCouponModal = () => ({ type: CLOSE_COUPON_MODAL });
export const toggleCouponModal = payload => ({
  type: TOGGLE_COUPON_MODAL,
  payload
});

export const OPEN_REWARD_MODAL = "OPEN_REWARD_MODAL";
export const CLOSE_REWARD_MODAL = "CLOSE_REWARD_MODAL";
export const TOGGLE_REWARD_MODAL = "TOGGLE_REWARD_MODAL";

export const openRewardModal = payload => ({
  type: OPEN_REWARD_MODAL,
  payload
});
export const closeRewardModal = () => ({ type: CLOSE_REWARD_MODAL });
export const toggleRewardModal = payload => ({
  type: TOGGLE_REWARD_MODAL,
  payload
});

export const OPEN_ANNOUCE_MODAL = "OPEN_ANNOUCE_MODAL";
export const CLOSE_ANNOUCE_MODAL = "CLOSE_ANNOUCE_MODAL";
export const TOGGLE_ANNOUCE_MODAL = "TOGGLE_ANNOUCE_MODAL";

export const openAnnouceModal = payload => ({
  type: OPEN_ANNOUCE_MODAL,
  payload
});
export const closeAnnouceModal = () => ({ type: CLOSE_ANNOUCE_MODAL });
export const toggleAnnouceModal = payload => ({
  type: TOGGLE_ANNOUCE_MODAL,
  payload
});

export const OPEN_CARD_PREVIEW_MODAL = "OPEN_CARD_PREVIEW_MODAL";
export const CLOSE_CARD_PREVIEW_MODAL = "CLOSE_CARD_PREVIEW_MODAL";
export const TOGGLE_CARD_PREVIEW_MODAL = "TOGGLE_CARD_PREVIEW_MODAL";
export const openCardPreviewModal = payload => ({
  type: OPEN_CARD_PREVIEW_MODAL,
  payload
});
export const closeCardPreviewModal = () => ({ type: CLOSE_CARD_PREVIEW_MODAL });
export const toggleCardPreviewModal = payload => ({
  type: TOGGLE_CARD_PREVIEW_MODAL,
  payload
});

export const OPEN_SELECT_BRANCH_MODAL = "OPEN_SELECT_BRANCH_MODAL";
export const CLOSE_SELECT_BRANCH_MODAL = "CLOSE_SELECT_BRANCH_MODAL";
export const TOGGLE_SELECT_BRANCH_MODAL = "TOGGLE_SELECT_BRANCH_MODAL";
export const openSelectBranchModal = () => ({
  type: OPEN_SELECT_BRANCH_MODAL
});
export const closeSelectBranchModal = () => ({
  type: CLOSE_SELECT_BRANCH_MODAL
});
export const toggleSelectBranchModal = () => ({
  type: TOGGLE_SELECT_BRANCH_MODAL
});
