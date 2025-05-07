"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiagnosis = void 0;
const calculateDiagnosis = (answers) => {
    if (!Array.isArray(answers) || answers.length === 0) {
        throw new Error("Invalid input: answers must be a non-empty array.");
    }
    // Count "yes" responses
    const score = answers.filter(({ answer }) => answer.toLowerCase() === "yes").length;
    const totalQuestions = answers.length;
    const percentage = (score / totalQuestions) * 100;
    // Determine severity level
    let severity;
    if (percentage <= 40) {
        severity = "Mild";
    }
    else if (percentage <= 70) {
        severity = "Moderate";
    }
    else {
        severity = "Severe";
    }
    return {
        score,
        percentage: `${percentage.toFixed(2)}%`,
        severity
    };
};
exports.calculateDiagnosis = calculateDiagnosis;
