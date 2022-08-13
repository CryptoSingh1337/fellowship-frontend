export default function (context) {
  let user = context.$auth.user;
  if (!user.roles.includes("ADMIN"))
    return context.redirect("/error")
}
