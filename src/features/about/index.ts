// src/features/about/index.ts
/**
 * About Feature Exports
 * Centralized exports for all about page components, sections, and types
 */

// Sections
export * from "./sections";

// Components
export * from "./components";

// Data Types
export type { TeamMember } from "./data/teamMembers";
export type { Mission } from "./data/missions";
export type { Value } from "./data/values";

// Data
export { teamMembers } from "./data/teamMembers";
export { missions } from "./data/missions";
export { values } from "./data/values";
export { expertiseItems } from "./data/expertise";
