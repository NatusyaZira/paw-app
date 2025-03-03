export function TypeSelector({ setImageType, classCss, selectorClassCss}) {
    const handleTypeChange = (event) => {
      setImageType(event.target.value);
    };
  
    return (
        <div className={classCss}>
        <select onChange={handleTypeChange} className={selectorClassCss}>
          <option value="all">All</option>
          <option value="static">Static</option>
          <option value="animated">Animated</option>
        </select>
        </div>
    );
  }
  