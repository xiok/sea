dhtmlx.image_path = mainPath+'dhtmlx/imgs/';
	
var dhxLayout = new dhtmlXLayoutObject("mainView", "2U");
		
var mainLayout = dhxLayout.cells('a');
var mainTab = mainLayout.attachTabbar();
mainTab.normalize();
mainTab.enableScroll(false);

// alert(getBandera);
mainTab.addTab('tab_1','Principal');
mainTab.enableTabCloseButton(true);
mainTab.setContent('tab_1','logoMain');


var rightLayout = new dhtmlXLayoutObject(dhxLayout.cells("b"), "2E");	
dhxLayout.cells("b").showHeader();
dhxLayout.cells("b").setWidth('183');
dhxLayout.cells("b").setText('Enlaces Principales'); 
dhxLayout.cells("b").fixSize(true);

var links = rightLayout.cells("a");
links.hideHeader();
links.attachObject('cpanel');
links.setHeight('183');
links.fixSize(true,true);

var detail = rightLayout.cells("b");
detail.setText("Detalle de los &Iacute;tems");
detail.hideHeader();
detail.attachObject('detailMain');

var menuLayout = dhxLayout.attachMenu();
menuLayout.setIconsPath(mainPath+'images/icons/');

var sw = 0;
var d = getAcces.split(',');
menuLayout.loadXML(mainPath+'xml/menu.xml', function(){
    menuLayout.forEachItem(function(itemId){
        sw = 0;
        for(var i in d){			
            if(itemId == d[i] || itemId.split('_')[0] == 'sep'){
                sw = 1;
                break;
            }
        }
        if(sw == 0){
            //menuLayout.hideItem(itemId);
            menuLayout.setItemDisabled(itemId);
        }
    });
    if(getBandera==0)
        mainTab.setTabActive('tab_1');
    else
        mensajesClass.widgetMain();
});

var statusLayout = dhxLayout.attachStatusBar();
statusLayout.setText("Usuario: "+'<strong>'+getUser+'</strong>');
var actionBar = null;
function widgetBar(obj,sw){
	var me = this;
	me.actionBar =  obj.attachToolbar();
	me.actionBar.setIconsPath(mainPath+'images/icons32/');
	me.actionBar.setIconSize(32);		
	me.actionBar.loadXML(mainPath+"xml/toolbar.xml", function(){
		switch(sw){
			case 1:
                me.actionBar.hideItem('btn_add');
                me.actionBar.hideItem('btn_saveas');
				me.actionBar.hideItem('sep_1');
				me.actionBar.hideItem('btn_print');
			break;
            case 2:
                me.actionBar.hideItem('sep_1');
                me.actionBar.hideItem('btn_print');
            break;
            case 3:
                me.actionBar.hideItem('btn_add');
                me.actionBar.hideItem('btn_saveas');
            break;
		}
	});
	me.actionBar.setAlign('right');
	aux = me.actionBar;
}
function searchTab(idTab){
    var tab = mainTab.getAllTabs();
    for(var i in tab){
        if(tab[i] == idTab)
            return true;
    }
    return false;
}