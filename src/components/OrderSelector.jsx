export function OrderSelector({ setSortOrder, classCss, selectorClassCss}) {
    const handleSortChange = (event) => {
      setSortOrder(event.target.value);
    };
  
    return (
        <div className={classCss}>
        <select onChange={handleSortChange} className={selectorClassCss}>
          <option value="random">Random</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>

    );
  }