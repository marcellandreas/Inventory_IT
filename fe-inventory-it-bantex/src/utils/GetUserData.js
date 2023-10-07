function getUserData() {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  return { idUser, username };
}

export default getUserData;
