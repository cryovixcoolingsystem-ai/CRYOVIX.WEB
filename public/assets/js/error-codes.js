async function getErrorCode(brand, code) {

    const response = await fetch("data/error_codes.json");
    const data = await response.json();

    brand = brand.trim();
    code = code.trim().toUpperCase();

    if(data[brand] && data[brand][code]) {
        return `${brand} ${code}: ${data[brand][code]}`;
    }

    return "Error code not found.";
}