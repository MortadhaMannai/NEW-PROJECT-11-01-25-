"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto('https://demo.playwright.dev/todomvc');
}));
const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
];
test_1.test.describe('New Todo', () => {
    (0, test_1.test)('should allow me to add todo items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        // Create 1st todo.
        yield newTodo.fill(TODO_ITEMS[0]);
        yield newTodo.press('Enter');
        // Make sure the list only has one todo item.
        yield (0, test_1.expect)(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0]
        ]);
        // Create 2nd todo.
        yield newTodo.fill(TODO_ITEMS[1]);
        yield newTodo.press('Enter');
        // Make sure the list now has two todo items.
        yield (0, test_1.expect)(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);
        yield checkNumberOfTodosInLocalStorage(page, 2);
    }));
    (0, test_1.test)('should clear text input field when an item is added', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        // Create one todo item.
        yield newTodo.fill(TODO_ITEMS[0]);
        yield newTodo.press('Enter');
        // Check that input is empty.
        yield (0, test_1.expect)(newTodo).toBeEmpty();
        yield checkNumberOfTodosInLocalStorage(page, 1);
    }));
    (0, test_1.test)('should append new items to the bottom of the list', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // Create 3 items.
        yield createDefaultTodos(page);
        // create a todo count locator
        const todoCount = page.getByTestId('todo-count');
        // Check test using different methods.
        yield (0, test_1.expect)(page.getByText('3 items left')).toBeVisible();
        yield (0, test_1.expect)(todoCount).toHaveText('3 items left');
        yield (0, test_1.expect)(todoCount).toContainText('3');
        yield (0, test_1.expect)(todoCount).toHaveText(/3/);
        // Check all items in one call.
        yield (0, test_1.expect)(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
        yield checkNumberOfTodosInLocalStorage(page, 3);
    }));
});
test_1.test.describe('Mark all as completed', () => {
    test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield createDefaultTodos(page);
        yield checkNumberOfTodosInLocalStorage(page, 3);
    }));
    test_1.test.afterEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield checkNumberOfTodosInLocalStorage(page, 3);
    }));
    (0, test_1.test)('should allow me to mark all items as completed', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // Complete all todos.
        yield page.getByLabel('Mark all as complete').check();
        // Ensure all todos have 'completed' class.
        yield (0, test_1.expect)(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
        yield checkNumberOfCompletedTodosInLocalStorage(page, 3);
    }));
    (0, test_1.test)('should allow me to clear the complete state of all items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const toggleAll = page.getByLabel('Mark all as complete');
        // Check and then immediately uncheck.
        yield toggleAll.check();
        yield toggleAll.uncheck();
        // Should be no completed classes.
        yield (0, test_1.expect)(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
    }));
    (0, test_1.test)('complete all checkbox should update state when items are completed / cleared', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const toggleAll = page.getByLabel('Mark all as complete');
        yield toggleAll.check();
        yield (0, test_1.expect)(toggleAll).toBeChecked();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 3);
        // Uncheck first todo.
        const firstTodo = page.getByTestId('todo-item').nth(0);
        yield firstTodo.getByRole('checkbox').uncheck();
        // Reuse toggleAll locator and make sure its not checked.
        yield (0, test_1.expect)(toggleAll).not.toBeChecked();
        yield firstTodo.getByRole('checkbox').check();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 3);
        // Assert the toggle all is checked again.
        yield (0, test_1.expect)(toggleAll).toBeChecked();
    }));
});
test_1.test.describe('Item', () => {
    (0, test_1.test)('should allow me to mark items as complete', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        // Create two items.
        for (const item of TODO_ITEMS.slice(0, 2)) {
            yield newTodo.fill(item);
            yield newTodo.press('Enter');
        }
        // Check first item.
        const firstTodo = page.getByTestId('todo-item').nth(0);
        yield firstTodo.getByRole('checkbox').check();
        yield (0, test_1.expect)(firstTodo).toHaveClass('completed');
        // Check second item.
        const secondTodo = page.getByTestId('todo-item').nth(1);
        yield (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        yield secondTodo.getByRole('checkbox').check();
        // Assert completed class.
        yield (0, test_1.expect)(firstTodo).toHaveClass('completed');
        yield (0, test_1.expect)(secondTodo).toHaveClass('completed');
    }));
    (0, test_1.test)('should allow me to un-mark items as complete', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        // Create two items.
        for (const item of TODO_ITEMS.slice(0, 2)) {
            yield newTodo.fill(item);
            yield newTodo.press('Enter');
        }
        const firstTodo = page.getByTestId('todo-item').nth(0);
        const secondTodo = page.getByTestId('todo-item').nth(1);
        const firstTodoCheckbox = firstTodo.getByRole('checkbox');
        yield firstTodoCheckbox.check();
        yield (0, test_1.expect)(firstTodo).toHaveClass('completed');
        yield (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        yield firstTodoCheckbox.uncheck();
        yield (0, test_1.expect)(firstTodo).not.toHaveClass('completed');
        yield (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        yield checkNumberOfCompletedTodosInLocalStorage(page, 0);
    }));
    (0, test_1.test)('should allow me to edit an item', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield createDefaultTodos(page);
        const todoItems = page.getByTestId('todo-item');
        const secondTodo = todoItems.nth(1);
        yield secondTodo.dblclick();
        yield (0, test_1.expect)(secondTodo.getByRole('textbox', { name: 'Edit' })).toHaveValue(TODO_ITEMS[1]);
        yield secondTodo.getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
        yield secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter');
        // Explicitly assert the new text value.
        yield (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2]
        ]);
        yield checkTodosInLocalStorage(page, 'buy some sausages');
    }));
});
test_1.test.describe('Editing', () => {
    test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield createDefaultTodos(page);
        yield checkNumberOfTodosInLocalStorage(page, 3);
    }));
    (0, test_1.test)('should hide other controls when editing', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItem = page.getByTestId('todo-item').nth(1);
        yield todoItem.dblclick();
        yield (0, test_1.expect)(todoItem.getByRole('checkbox')).not.toBeVisible();
        yield (0, test_1.expect)(todoItem.locator('label', {
            hasText: TODO_ITEMS[1],
        })).not.toBeVisible();
        yield checkNumberOfTodosInLocalStorage(page, 3);
    }));
    (0, test_1.test)('should save edits on blur', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItems = page.getByTestId('todo-item');
        yield todoItems.nth(1).dblclick();
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');
        yield (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        yield checkTodosInLocalStorage(page, 'buy some sausages');
    }));
    (0, test_1.test)('should trim entered text', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItems = page.getByTestId('todo-item');
        yield todoItems.nth(1).dblclick();
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('    buy some sausages    ');
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');
        yield (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        yield checkTodosInLocalStorage(page, 'buy some sausages');
    }));
    (0, test_1.test)('should remove the item if an empty text string was entered', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItems = page.getByTestId('todo-item');
        yield todoItems.nth(1).dblclick();
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('');
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');
        yield (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[2],
        ]);
    }));
    (0, test_1.test)('should cancel edits on escape', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItems = page.getByTestId('todo-item');
        yield todoItems.nth(1).dblclick();
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
        yield todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Escape');
        yield (0, test_1.expect)(todoItems).toHaveText(TODO_ITEMS);
    }));
});
test_1.test.describe('Counter', () => {
    (0, test_1.test)('should display the current number of todo items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        // create a todo count locator
        const todoCount = page.getByTestId('todo-count');
        yield newTodo.fill(TODO_ITEMS[0]);
        yield newTodo.press('Enter');
        yield (0, test_1.expect)(todoCount).toContainText('1');
        yield newTodo.fill(TODO_ITEMS[1]);
        yield newTodo.press('Enter');
        yield (0, test_1.expect)(todoCount).toContainText('2');
        yield checkNumberOfTodosInLocalStorage(page, 2);
    }));
});
test_1.test.describe('Clear completed button', () => {
    test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield createDefaultTodos(page);
    }));
    (0, test_1.test)('should display the correct text', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.locator('.todo-list li .toggle').first().check();
        yield (0, test_1.expect)(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
    }));
    (0, test_1.test)('should remove completed items when clicked', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItems = page.getByTestId('todo-item');
        yield todoItems.nth(1).getByRole('checkbox').check();
        yield page.getByRole('button', { name: 'Clear completed' }).click();
        yield (0, test_1.expect)(todoItems).toHaveCount(2);
        yield (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    }));
    (0, test_1.test)('should be hidden when there are no items that are completed', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.locator('.todo-list li .toggle').first().check();
        yield page.getByRole('button', { name: 'Clear completed' }).click();
        yield (0, test_1.expect)(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
    }));
});
test_1.test.describe('Persistence', () => {
    (0, test_1.test)('should persist its data', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        for (const item of TODO_ITEMS.slice(0, 2)) {
            yield newTodo.fill(item);
            yield newTodo.press('Enter');
        }
        const todoItems = page.getByTestId('todo-item');
        const firstTodoCheck = todoItems.nth(0).getByRole('checkbox');
        yield firstTodoCheck.check();
        yield (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        yield (0, test_1.expect)(firstTodoCheck).toBeChecked();
        yield (0, test_1.expect)(todoItems).toHaveClass(['completed', '']);
        // Ensure there is 1 completed item.
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        // Now reload.
        yield page.reload();
        yield (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        yield (0, test_1.expect)(firstTodoCheck).toBeChecked();
        yield (0, test_1.expect)(todoItems).toHaveClass(['completed', '']);
    }));
});
test_1.test.describe('Routing', () => {
    test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield createDefaultTodos(page);
        // make sure the app had a chance to save updated todos in storage
        // before navigating to a new view, otherwise the items can get lost :(
        // in some frameworks like Durandal
        yield checkTodosInLocalStorage(page, TODO_ITEMS[0]);
    }));
    (0, test_1.test)('should allow me to display active items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItem = page.getByTestId('todo-item');
        yield page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        yield page.getByRole('link', { name: 'Active' }).click();
        yield (0, test_1.expect)(todoItem).toHaveCount(2);
        yield (0, test_1.expect)(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    }));
    (0, test_1.test)('should respect the back button', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const todoItem = page.getByTestId('todo-item');
        yield page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        yield test_1.test.step('Showing all items', () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.getByRole('link', { name: 'All' }).click();
            yield (0, test_1.expect)(todoItem).toHaveCount(3);
        }));
        yield test_1.test.step('Showing active items', () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.getByRole('link', { name: 'Active' }).click();
        }));
        yield test_1.test.step('Showing completed items', () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.getByRole('link', { name: 'Completed' }).click();
        }));
        yield (0, test_1.expect)(todoItem).toHaveCount(1);
        yield page.goBack();
        yield (0, test_1.expect)(todoItem).toHaveCount(2);
        yield page.goBack();
        yield (0, test_1.expect)(todoItem).toHaveCount(3);
    }));
    (0, test_1.test)('should allow me to display completed items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        yield page.getByRole('link', { name: 'Completed' }).click();
        yield (0, test_1.expect)(page.getByTestId('todo-item')).toHaveCount(1);
    }));
    (0, test_1.test)('should allow me to display all items', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
        yield checkNumberOfCompletedTodosInLocalStorage(page, 1);
        yield page.getByRole('link', { name: 'Active' }).click();
        yield page.getByRole('link', { name: 'Completed' }).click();
        yield page.getByRole('link', { name: 'All' }).click();
        yield (0, test_1.expect)(page.getByTestId('todo-item')).toHaveCount(3);
    }));
    (0, test_1.test)('should highlight the currently applied filter', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield (0, test_1.expect)(page.getByRole('link', { name: 'All' })).toHaveClass('selected');
        //create locators for active and completed links
        const activeLink = page.getByRole('link', { name: 'Active' });
        const completedLink = page.getByRole('link', { name: 'Completed' });
        yield activeLink.click();
        // Page change - active items.
        yield (0, test_1.expect)(activeLink).toHaveClass('selected');
        yield completedLink.click();
        // Page change - completed items.
        yield (0, test_1.expect)(completedLink).toHaveClass('selected');
    }));
});
function createDefaultTodos(page) {
    return __awaiter(this, void 0, void 0, function* () {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
        for (const item of TODO_ITEMS) {
            yield newTodo.fill(item);
            yield newTodo.press('Enter');
        }
    });
}
function checkNumberOfTodosInLocalStorage(page, expected) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield page.waitForFunction(e => {
            return JSON.parse(localStorage['react-todos']).length === e;
        }, expected);
    });
}
function checkNumberOfCompletedTodosInLocalStorage(page, expected) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield page.waitForFunction(e => {
            return JSON.parse(localStorage['react-todos']).filter((todo) => todo.completed).length === e;
        }, expected);
    });
}
function checkTodosInLocalStorage(page, title) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield page.waitForFunction(t => {
            return JSON.parse(localStorage['react-todos']).map((todo) => todo.title).includes(t);
        }, title);
    });
}
//# sourceMappingURL=demo-todo-app.spec.js.map