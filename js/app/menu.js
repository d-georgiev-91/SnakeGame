define(() => {
    const CLASSES = {
            MENU: 'game-menu',
            MENU_ITEM: 'menu-item',
            MENU_BUTTON: 'menu-button'
        },
        MENU_ITEM_KEY_ATTRIBUTE = 'data-menu-item-key';

    class Menu {
        constructor(menuHolderSelector, menuItems) {
            this._menuItems = menuItems;
            this._menuPlaceHolder = document.querySelector(menuHolderSelector);
            this._render();
        }

        show() {
            this._menuElement.classList.remove('hidden');
        }

        hide() {
            this._menuElement.classList.add('hidden');
        }

        _render() {
            this._menuElement = document.createElement('ul');
            this._menuElement.classList.add(CLASSES.MENU);

            this._menuItems.forEach((menuItem) => {
                let li = this._renderMenuItem(menuItem.key, menuItem.text);
                this._menuElement.appendChild(li);
            });

            this._menuPlaceHolder.appendChild(this._menuElement);
            this._registerActions();
        }

        _renderMenuItem(key, text) {
            let li;

            if (this._menuItemElement) {
                li = this._menuItemElement.cloneNode(true);
            } else {
                li = document.createElement('li');
                li.classList.add(CLASSES.MENU_ITEM);


                let a = document.createElement('a');
                a.href = '#';
                a.classList.add(CLASSES.MENU_BUTTON);

                li.appendChild(a);
            }

            li.setAttribute(MENU_ITEM_KEY_ATTRIBUTE, key);
            li.children[0].innerText = text;

            return li;
        }

        _registerActions() {
            this._menuActions = this._menuItems.reduce((accumulator, item) => {
                accumulator[item.key] = item.action;

                return accumulator;
            }, {});

            this._menuElement.addEventListener('click', (event) => {
                let clickedItem = event.target;

                if (!clickedItem.classList.contains('menu-button')) {
                    return;
                }

                let menuItem = clickedItem.parentElement;
                let menuItemKey = menuItem.getAttribute(MENU_ITEM_KEY_ATTRIBUTE);

                this._menuActions[menuItemKey]();
            });
        }
    }

    return Menu;
});