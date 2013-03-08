/*
 * ver.0.2.9
 *
 * jquery.tabbar
 * Require jQuery ver.1.7 or higher.
 * Written by Hituzi Ando.
 */

$.fn.Tabbar = $.fn.Tabbar || function ()
{
	var self = this;	// jQuery object
    
	var addOnTapTabEventListener = function (tabbar, tabId, index)
	{
		// 'touchstart' is faster than 'click' event.
		// But 'touchstart' event is only for smartphone. This code can be run on both smartphone and PC.
		var eventName = ('ontouchstart' in document) ? 'touchstart' : 'click';
		$('div').on(eventName, tabId, function ()
		{
			// If current index is equal to new index, tabs are not changed.
			if (tabbar.curIndex !== index)
			{
				tabbar.prevIndex = index;
				// Throw index of tapped tab to tabbar's event handler.
				tabbar.tab(index).fire(index);
			}
		});
	};
	
	// Return Tabbar object.
	return {
		// Variables:
		$tabs   : [],
		curIndex: -1,

		// Functions:
		setUI: function (labels, imgs, firstTab)
		{
			for (var i = 0, l = labels.length, w = 100 / l; i < l; i++)
			{
				// Prevent conflict ids.
				var tabId = 'htz-tab' + i + new Date().getTime();
				// Make and append each of tabs.
				var html = [];
				html.push('<div class="htz-tab-deactive" id="');
				html.push(tabId);
				html.push('" style="width:');
				html.push(w);
				html.push('%; left:');
				html.push(w * i);
				html.push('%;"><div class="htz-tab" style="width:');
				html.push(w);
				html.push('%; left:');
				html.push(w * i);
				html.push('%;"><img class="htz-tab-img" src="');
				html.push(imgs[i]);
				html.push('"><br>');
				html.push(labels[i]);
				html.push('</div></div>');
				self.append(html.join(''));
				// Create jQuery objects of tabs.
				var _tabId = '#' + tabId;
				this.$tabs.push($(_tabId));
				// Tabs' event handler.
				addOnTapTabEventListener(this, _tabId, i);
			}
			// Highlight a first tab.
			firstTab = firstTab || 0;
			this.tab(firstTab);
			// Return this Tabbar object.
			return this;
		},
		setListener: function (callback)    // callback(event, index)
		{
			$(document).on('htzTap', self.selector, callback);
			return this;
		},
		tab: function (i)
		{
			// Deactivate a current tab.
			if (this.curIndex !== -1)
			{
				this.$tabs[this.curIndex].addClass('htz-tab-deactive');
				this.$tabs[this.curIndex].removeClass('htz-tab-active');
			}
			// Activate a next tab.
			this.$tabs[i].removeClass('htz-tab-deactive');
			this.$tabs[i].addClass('htz-tab-active');
			this.curIndex = i;
			return this;
		},
		fire: function (i)
		{
			// Fire event.
			self.trigger('htzTap', [i]);
			return this;
		}
	};
};