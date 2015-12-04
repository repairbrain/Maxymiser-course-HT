/*Релизовать функцию createList(listData, listContainer, itemContainer), возвращаюшую узел списка. Использовать innerHTML нельзя. 
Второй и третий аргументы не обязательные. Значения по умолчанию для них - ul и li. listData - массив. 
listData Может содержать как элементы (текст), так и массивы элементов. 
Глубина вложенности массивов любая.

Примеры возвращаемых узлов:

createList(['мясо', 'рыба']) /* ->
<ul>
  <li>мясо</li>
  <li>рыба</li>
</ul>
*/

/*createList(['мясо', ['яблоки', 'бананы']], 'ol') /*->
<ol>
  <li>мясо</li>
  <li>
    <ol>
      <li>яблоки</li>
      <li>бананы</li>
    </ol>
  </li>
</ol>
*/

/*createList(['мясо', ['яблоки', 'бананы']], 'div', 'div') /*->
<div>
  <div>мясо</div>
  <div>
    <div>
      <div>яблоки</div>
      <div>бананы</div>
    </div>
  </div>
</div>
*/

function createList(listData, listContainer, itemContainer) {
    var _listContainer = listContainer || "ul";
    var _itemContainer = itemContainer || "li";

    function createListElem(items) {
        var listElem = document.createElement(_listContainer);
        items.forEach(function(el) {
            if (el.constructor !== Array) {
                var item = document.createElement(_itemContainer);
                item.innerText = el;
                listElem.appendChild(item);
            } else {
                listElem.appendChild(createListElem(el));
            }

        });
        return listElem;
    }

    return createListElem(listData);
}