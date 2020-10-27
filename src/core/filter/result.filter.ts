export default function ResultFilter() {
    return function (users: Array<User>, show: String): String {
        let result;
        switch (show) {
            case 'U':
            case 'C':
            case 'B':
                result = users.filter(function (user) {
                    return user.role === show;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
            case 'A':
                result = users.filter(function (user) {
                    return user.status !== -1;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
            case 'O':
                result = users.filter(function (user) {
                    return user.status === -1;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
        }
        if (!result) result = "无";
        return result;
    }
};
