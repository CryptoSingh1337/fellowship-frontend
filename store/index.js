export const state = () => ({
  alert: false,
  alertType: "",
  alertIcon: "",
  alertText: "",
})

export const mutations = {
  toggleAlert: state => state.alert = false,
  showAlert: (state, payload) => {
    state.alertType = payload.alertType;
    state.alertText = payload.alertText;
    state.alertIcon = payload.alertIcon;
    state.alert = true;
  }
}
