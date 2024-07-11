export const tagyToOption = (tagy) => ({
  value: tagy._id,
  label: tagy.title,
});

export const filterTags = (inputValue, tagsData) => {
  const filteredTagOptions = tagsData
    .map(tagyToOption)
    .filter((tagy) =>
      tagy.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredTagOptions;
};
