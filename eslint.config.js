import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat();

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  prettier,
  { ignores: [".next"] },
];

export default config;
