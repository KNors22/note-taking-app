const collectionColors = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Gold', value: '#ca8a04' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Teal', value: '#0891b2' },
  { name: 'Slate', value: '#475569' },
  { name: 'Charcoal', value: '#1f2937' },
];

document.querySelectorAll('[data-collection-color-select]').forEach((select) => {
  const selectedColor = select.dataset.selectedColor || collectionColors[0].value;

  collectionColors.forEach(({ name, value }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = name;
    option.selected = value === selectedColor;
    select.appendChild(option);
  });
});
