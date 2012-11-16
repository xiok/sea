<?php

/**
 * This is the model class for table "tbl_roles".
 *
 * The followings are the available columns in table 'tbl_roles':
 * @property integer $rol_id
 * @property string $rol_codigo
 * @property string $rol_detalle
 * @property string $rol_archivo
 * @property integer $rol_estado
 */
class tbl_roles extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_roles the static model class
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
		return 'tbl_roles';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('rol_codigo, rol_detalle, rol_estado, rol_archivo', 'required'),
            array('rol_codigo', 'length', 'max'=>4),			
			array('rol_detalle', 'length', 'max'=>20),
            array('rol_estado', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('rol_id, rol_codigo, rol_detalle, rol_archivo, rol_estado', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'rol_id' => 'Rol',
			'rol_codigo' => 'Rol Codigo',
			'rol_detalle' => 'Rol Detalle',
			'rol_archivo' => 'Rol Archivo',
			'rol_estado' => 'Rol Estado',
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

		$criteria->compare('rol_id',$this->rol_id);

		$criteria->compare('rol_codigo',$this->rol_codigo,true);

		$criteria->compare('rol_detalle',$this->rol_detalle,true);

		$criteria->compare('rol_archivo',$this->rol_archivo,true);

		$criteria->compare('rol_estado',$this->rol_estado);

		return new CActiveDataProvider('tbl_roles', array(
			'criteria'=>$criteria,
		));
	}
}