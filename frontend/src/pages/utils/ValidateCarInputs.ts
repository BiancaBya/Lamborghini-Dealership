import {notifyError} from "./Notify.ts";

export function validateInputs(model: string, year: string, power: string, price: string) : boolean {
    if (!model.trim()) {
        notifyError("Model is required!");
        return false;
    }
    const y = Number(year);
    if (!year.trim() || isNaN(y) || y <= 0) {
        notifyError("Please enter a valid year!");
        return false;
    }
    const p = Number(power);
    if (!power.trim() || isNaN(p) || p <= 0) {
        notifyError("Please enter valid power!");
        return false;
    }
    const pr = Number(price);
    if (!price.trim() || isNaN(pr) || pr <= 0) {
        notifyError("Please enter a valid price!");
        return false;
    }
    const allowedModels = ["Huracan", "Revuelto", "Urus", "Aventador"];
    const hasValidModel = allowedModels.some((name) => model.includes(name));
    if (!hasValidModel) {
        notifyError(
            `Model must include one of: ${allowedModels.join(", ")}`
        );
        return false;
    }
    return true;
}


