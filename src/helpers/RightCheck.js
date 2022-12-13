import store from "@/store";

export default function rightCheck(path) {
    const userRights = store.getters['rights/getUserRights']
    const allow = userRights?.some((right) => right.code_name == path)
    return allow
}