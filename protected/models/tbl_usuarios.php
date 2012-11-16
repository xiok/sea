<?php

/**
 * This is the model class for table "tbl_usuarios".
 *
 * The followings are the available columns in table 'tbl_usuarios':
 * @property integer $usu_id
 * @property string $usu_codigo
 * @property string $usu_nombres
 * @property string $usu_paterno
 * @property string $usu_materno
 * @property string $usu_email
 * @property string $usu_rol
 * @property string $usu_login
 * @property string $usu_pass
 * @property integer $usu_notificar
 * @property integer $usu_estado
 */
class tbl_usuarios extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_usuarios the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_usuarios';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('usu_nombres, usu_paterno, usu_materno, usu_email, usu_rol, usu_login, usu_pass, usu_notificar, usu_estado', 'required'),
			array('usu_notificar, usu_estado', 'numerical', 'integerOnly'=>true),
			array('usu_nombres, usu_paterno, usu_materno', 'length', 'max'=>25),
			array('usu_email', 'length', 'max'=>40),
			array('usu_rol', 'length', 'max'=>4),
			array('usu_login', 'length', 'max'=>15),
			array('usu_pass', 'length', 'max'=>50),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('usu_id, usu_codigo, usu_nombres, usu_paterno, usu_materno, usu_email, usu_rol, usu_login, usu_pass, usu_notificar, usu_estado', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.		
        return array(
            'rol'=>array(self::BELONGS_TO, 'tbl_roles', array('usu_rol'=>'rol_codigo')),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'usu_id' => 'Usu',
			'usu_codigo' => 'Usu Codigo',
			'usu_nombres' => 'Usu Nombres',
			'usu_paterno' => 'Usu Paterno',
			'usu_materno' => 'Usu Materno',
			'usu_email' => 'Usu Email',
			'usu_rol' => 'Usu Rol',
			'usu_login' => 'Usu Login',
			'usu_pass' => 'Usu Pass',
			'usu_notificar' => 'Usu Notificar',
			'usu_estado' => 'Usu Estado',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('usu_id',$this->usu_id);

		$criteria->compare('usu_codigo',$this->usu_codigo,true);

		$criteria->compare('usu_nombres',$this->usu_nombres,true);

		$criteria->compare('usu_paterno',$this->usu_paterno,true);

		$criteria->compare('usu_materno',$this->usu_materno,true);

		$criteria->compare('usu_email',$this->usu_email,true);

		$criteria->compare('usu_rol',$this->usu_rol,true);

		$criteria->compare('usu_login',$this->usu_login,true);

		$criteria->compare('usu_pass',$this->usu_pass,true);

		$criteria->compare('usu_notificar',$this->usu_notificar);

		$criteria->compare('usu_estado',$this->usu_estado);

		return new CActiveDataProvider('tbl_usuarios', array(
			'criteria'=>$criteria,
		));
	}
}