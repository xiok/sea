var envioClass = {
	parent: "parentId",
	pattern: "4H",
	win: null,
	form: null,
	grid: null,
	actionBar: null,
	layout: null,
	tree: null,
	fecha: null,
	usuDes: null,
	idTree: null,
	statusGrid: null,
	widgetWin: function(){
		var windows = new dhtmlXWindows();
		this.win = windows.createWindow('window_1', 0, 0, 650, 480);
		this.win.setText('Nuevo Mensaje');
		this.win.clearIcon();
		this.win.button('park').hide();
		this.win.button('minmax1').hide();
		this.win.denyResize();
		this.win.setModal(1);
		this.win.centerOnScreen();
		this.widgetBar();
		this.layout = this.win.attachLayout('3L');
	},
	widgetBar: function(){
		this.actionBar =  this.win.attachToolbar();
		this.actionBar.setIconsPath(mainPath+"/images/icons32/");
		this.actionBar.setIconSize(32);
		this.actionBar.loadXML(mainPath+"xml/toolbarEnvio.xml");
		this.actionBar.setAlign('left');
	},
	widgetTree: function(){
		var cell = this.layout.cells('b');
		cell.setWidth('160');
		cell.hideHeader();
		cell.fixSize(true, true);		
		var me = this;
		me.tree = cell.attachTree();
		me.tree.enableCheckBoxes(1);
		me.tree.enableThreeStateCheckboxes(true);		
		me.tree.loadXML(mainPath+"xml/envioTree.php");
	},
	widgetGrid: function(){
		var cell = this.layout.cells('c');
		cell.setWidth('160');
		cell.hideHeader();
		cell.fixSize(true, true);		
		var me = this;
		me.statusGrid = cell.attachStatusBar();		
		me.grid = cell.attachGrid();		
		me.grid.setImagePath(mainPath+'dhtmlx/imgs/');
		me.grid.attachHeader("#rspan,#text_filter");
		me.grid.setHeader("Id,Nombre,.");
		me.grid.setColTypes("ro,ro,ch");		
		me.grid.setColAlign("right,left,left");
		me.grid.setInitWidths("22,*,22");		
		me.grid.setColumnColor("#E5E5E5");
		me.grid.setColumnHidden(0,true);
		me.grid.init();			
	},
	widgetForm: function(){
		var panel = this.layout.cells('a');
		panel.setWidth('600');
		panel.hideHeader();
		var str = [
			{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute" },
			{ type:"input" , name:"mens_asunto",validate:"NotEmpty", rows:"2", labelWidth:0, labelHeight:0, labelAlign:"left", inputWidth:445, inputHeight:59, labelLeft:50, labelTop:50, inputLeft:5, inputTop:20},
			{ type:"editor" , name:"mens_descripcion",validate:"NotEmpty", labelWidth:575, inputWidth:445, inputHeight:250, labelLeft:50, labelTop:250, inputLeft:5, inputTop:110  },
			{ type:"label" , name:"form_label_1", label:"Asunto:", width:250, labelWidth:250, labelLeft:5, labelTop:0  },
			{ type:"label" , name:"form_label_2", label:"Mensaje:", width:250, labelWidth:250, labelLeft:5, labelTop:85  },
			{ type: "hidden", name:"usu_id" }
		];
		var me = this;
		me.form = panel.attachForm(str);
	},
	widgetMain: function(){
		envioClass.widgetWin();
		envioClass.widgetTree();
		envioClass.widgetForm();
		envioClass.widgetGrid();
		envioClass.tree.attachEvent("onCheck", function(id,state){
			var usu = envioClass.tree.getAllChecked().split(',');
			var ruta=mainPath+"index.php/usuarios/grid_mensaje?";
			var sw=0;
			var c=0;
			envioClass.grid.clearAll();
			for(i=0;i<=usu.length-1;i=i+1){				
				if(usu[i].substring(0,1)=="M"){
					if(sw==0){
						sw=1;
						ruta=ruta+"mun"+c+"="+usu[i].substring(1);
					}
					else
						ruta=ruta+"&mun"+c+"="+usu[i].substring(1);
					c=c+1;
				}
			}	
			ruta=ruta+"&usu_id="+idUsuario;
			// envioClass.form.send(ruta, function(loader, response) {
				// alert(response);
			// });
			if(envioClass.tree.getAllChecked().length>0){
				envioClass.grid.load(ruta, function(){
					envioClass.statusGrid.setText("Numero de Registros: "+envioClass.grid.getRowsNum());
				},"json");			
			}
		});
		envioClass.actionBar.attachEvent("onClick", function(itemId)
		{
			var me =envioClass;
			var f=new Date();
			var mens_asunto=envioClass.form.getItemValue("mens_asunto");
			var mens_descripcion=envioClass.form.getItemValue("mens_descripcion");
			var fecha=(f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate());
			fecha=(fecha+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds());
			
			switch(itemId){
				case 'btn_Enviar':
					envioClass.form.send(mainPath+'index.php/Usuarios/Usu_data?id='+idUsuario, function(loader, response) {
						me.form.setItemValue('mens_remitente', response);
						usuDes=response;
						var usuId = me.tree.getAllChecked().split(',');
						var sw=0;
						var i;
						if(usuId.length>1 && mens_asunto != null && mens_descripcion!= null){
							me.grid.forEachRow(function(id){
								var mens_destinatario=me.grid.cells(id,1).getValue();
								var mens_usu_des=me.grid.cells(id,0).getValue();
								var check=me.grid.cells(id,2).getValue();
								if(check==1){
									envioClass.form.send(mainPath+'index.php/Mens/Save_data?mens_usu='+idUsuario+'&mens_remitente='+usuDes+'&mens_destinatario='+mens_destinatario+'&mens_asunto='+mens_asunto+'&mens_descripcion='+mens_descripcion+'&mens_usu_des='+mens_usu_des+'&mens_fecha='+fecha+'&mens_estado=0',function(loader, response) {

									});
								}
							});
							dhtmlx.alert("Enviado");
						}
						else{
							dhtmlx.alert("Debe llenar todos los campos y escoger Usuario(s)");
						}
					});
				break;
				case 'btn_Guardar':
					usuDes="BORRADOR";
					var mens_destinatario="BORRADOR";
					envioClass.form.send(mainPath+'index.php/Mens/Save_data?mens_usu='+idUsuario+'&mens_remitente='+usuDes+'&mens_destinatario='+mens_destinatario+'&mens_asunto='+mens_asunto+'&mens_descripcion='+mens_descripcion+'&mens_usu_des='+0+'&mens_fecha='+fecha+'&mens_estado=1',function(loader, response) {
						dhtmlx.alert("Guardado");
					});
					// envioClass.form.send(mainPath+'index.php/Mens/Save_data?mens_usu='+idUsuario+'&mens_remitente='+usuDes+'&mens_destinatario='+treeVal+'&mens_asunto='+mens_asunto+'&mens_mens_descripcion='+mens_descripcion+'&mens_usu_des='+0+'&mens_fecha='+fecha+'&mens_estado=1', function(loader, response) {
						// dhtmlx.alert("Guardado");
					// });
				break;
				case 'btn_Limpiar':
					envioClass.form.clear();
				break;
			}
		});		
	}
};