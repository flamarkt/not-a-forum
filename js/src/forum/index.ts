import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import UserPage from 'flarum/forum/components/UserPage';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import Search from 'flarum/forum/components/Search';
import ItemList from 'flarum/common/utils/ItemList';

app.initializers.add('flamarkt-not-a-forum', () => {
    extend(IndexPage.prototype, 'sidebarItems', function (items: ItemList) {
        if (items.has('newDiscussion')) {
            items.remove('newDiscussion');
        }
    });

    extend(IndexPage.prototype, 'navItems', function (items: ItemList) {
        if (items.has('allDiscussions')) {
            items.remove('allDiscussions');
        }
    });

    extend(SessionDropdown.prototype, 'items', function (items: ItemList) {
        if (items.has('profile')) {
            items.remove('profile');
        }
    });

    extend(UserPage.prototype, 'navItems', function (items: ItemList) {
        if (items.has('posts')) {
            items.remove('posts');
        }

        if (items.has('discussions')) {
            items.remove('discussions');
        }
    });

    extend(SettingsPage.prototype, 'settingsItems', function (items: ItemList) {
        if (items.has('privacy')) {
            items.remove('privacy');
        }
    });

    extend(NotificationGrid.prototype, 'notificationTypes', function (items: ItemList) {
        if (items.has('discussionRenamed')) {
            items.remove('discussionRenamed');
        }
    });

    extend(Search.prototype, 'sourceItems', function (items: ItemList) {
        if (items.has('discussions')) {
            items.remove('discussions');
        }
    });

    extend(Search.prototype, 'view', function (this: Search, vdom: any) {
        if (this.sources.length !== 1) {
            return;
        }

        // If there is only one search source (likely Flamarkt products), we will remove the search header that says which kind of results are being shown
        if (vdom && vdom.children) {
            const lastChild = vdom.children[vdom.children.length - 1];

            if (lastChild && lastChild.attrs && lastChild.attrs.className === 'Dropdown-menu Search-results' && lastChild.children) {
                const firstChild = lastChild.children[0];

                if (firstChild && firstChild.tag === '[' && firstChild.children) {
                    firstChild.children = firstChild.children.filter((child: any) => {
                        return !child || !child.attrs || child.attrs.className !== 'Dropdown-header';
                    });
                }
            }
        }
    });
});
