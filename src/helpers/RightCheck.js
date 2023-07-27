import store from "@/store";

export default function rightCheck(wantedRight) {
    const userRights = store.getters['rights/getUserRights']
    const allow = userRights?.some((right) => right.code_name == wantedRight)
    return allow
}