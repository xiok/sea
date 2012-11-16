<?php
class AppController extends Controller
{
	var $widKey = false;
    public function actionIndex()
	{		     
        $this->render('login');
	}
	public function actionSystem() 
	{
		try{
			if(!is_null(Yii::app()->session->get('user'))){
				$this->widKey = true;
				$this->render('index');
			}
		}catch(Exception $e){
			$this->widKey = false;
		}
		if(!$this->widKey)
			header('Location: ../../index.php');
	}
    private function actionAddAccess()
    {        
        $model = new tbl_accesos;        
        $transaction = Yii::app()->db->beginTransaction();        
        try{                        
            require_once('/../../librarys/ip2locationlite.class.php');             
            $ipLite = new ip2location_lite;
            $ipLite->setKey('01a91973f95dca524209cb032d4108c184a0dfb2118e56ba5e6d066f0d0fa4a8');
            $locations = $ipLite->getCity($_SERVER['REMOTE_ADDR']);            
            if (!empty($locations) && is_array($locations) && $locations['ipAddress'] != '127.0.0.1'){                
                foreach ($locations as $field => $val){
                    switch($val){
                        case 'ipAddress':
                            $model->acc_ip = $val;                            
                        break;
                        case 'countryName':
                            $model->acc_pais = ucfirst($val);
                        break;
                        case 'regionName':                            
                            $aux[] = ucfirst($val);
                        break;
                        case 'cityName':
                            $aux[] = ucfirst($val);
                        break;
                    }
                }
                $model->acc_localidad = implode(', ',$aux);
                $model->fecha = date("Y-m-d");
                $model->hora = date("H:i:s");                                     
                $model->acc_usuario = Yii::app()->session['login'];
                $model->acc_rol = Yii::app()->session['rol'];
                                                                                        
                $this->widKey = $model->save();
                if($this->widKey)                       
                    $transaction->commit();                                                                                               
            }
            else
                //$this->widKey = true;
                return true;                
                           
                                                                                     
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){            
            $transaction->rollback();
            return false;
        }
        return true;
    }
	public function actionLogin()
	{	
		try{
			$user = Yii::app()->request->getParam('username');
			$pass = UsuariosController::encrypt(Yii::app()->request->getParam('password'));
			
			$model = tbl_usuarios::model()->find('usu_login=:postLogin AND usu_pass=:postPass',        
				array(
					':postLogin'=> $user,
					':postPass'=> $pass
				));                            
		
			if(!empty($model->usu_login)){			     
				if($model->usu_estado == 0){				    
					$this->widKey = true;
					
					$varMensajes = tbl_mensaje::model()->findAll('mens_usu_des=:getUsu',array(':getUsu'=>$model->usu_id));
					$varm=count($varMensajes);
					
					
					$varGestion = tbl_gestion::model()->find('ges_status=:gesActive', array(':gesActive'=> 1));
					Yii::app()->session->sessionID;
					Yii::app()->session['user'] = $model->usu_codigo;
                    Yii::app()->session['login'] = $model->usu_login;
					Yii::app()->session['rol'] = $model->usu_rol;
                    
					Yii::app()->session['gestion'] = $varGestion->ges_gestion;
					Yii::app()->session['ges_type'] = $varGestion->ges_type;
					Yii::app()->session['fecha'] = date("d-m-Y");
					Yii::app()->session['hora'] = date("h:m:s a");
					                    
					Yii::app()->request->cookies['userLogin'] = new CHttpCookie('userLogin', $model->usu_login);
					Yii::app()->request->cookies['userId'] = new CHttpCookie('userId', $model->usu_id);
                    Yii::app()->request->cookies['userAccess'] = new CHttpCookie('userAccess', $model->rol->rol_archivo);
					Yii::app()->request->cookies['userBandera'] = new CHttpCookie('userBandera', $varm);

                    /*                    
                    if(self::actionAddAccess())
					   echo true;
                    else
                        echo false;
                    */
                    echo true;
				}
				else
					echo 3;
			}
			else
				echo 2;
            
			
		}catch(Exception $e){
			$this->widKey = true;
		}
		if(!$this->widKey){
			Yii::app()->getSession()->closeSession();
			Yii::app()->getSession()->destroy();
            echo false;			            
        }
	}
}