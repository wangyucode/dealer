export default function ShowWordFilter() {
    return function (word: String, show: Boolean): String {
        return show ? word : "****";
    }
};
