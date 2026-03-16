import { Linter } from 'eslint';
import fs from 'fs';

const linter = new Linter();
const rules = linter.getRules();

const rulesList = Array.from(rules.entries()).map(([name, rule]) => ({
  name,
  description: rule.meta?.docs?.description || 'No description',
  category: rule.meta?.docs?.category || 'Unknown',
  recommended: rule.meta?.docs?.recommended || false,
  fixable: rule.meta?.fixable || null,
}));

// Сортировка по категориям
const byCategory = rulesList.reduce((acc, rule) => {
  if (!acc[rule.category]) {
    acc[rule.category] = [];
  }
  acc[rule.category].push(rule);
  return acc;
}, {});

// Сохранение в файл
fs.writeFileSync(
  'appendix/eslint-core-rules.json',
  JSON.stringify(byCategory, null, 2),
  'utf8'
);

console.log(`✅ Экспортировано ${rulesList.length} правил ESLint Core`);
console.log(`📁 Файл сохранён: appendix/eslint-core-rules.json`);