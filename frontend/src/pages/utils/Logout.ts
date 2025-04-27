import { NavigateFunction } from 'react-router-dom';

export function logout(navigate: NavigateFunction): void {

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    fetch(`http://localhost:8080/api/login/logout?email=${user.email}`, {
        method: "DELETE",
    })
        .then(() => {
            sessionStorage.removeItem("user");
            navigate("/", { replace: true });
        });

    navigate('/', { replace: true });
}



