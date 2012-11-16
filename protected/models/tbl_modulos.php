<?php

/**
 * This is the model class for table "tbl_modulos".
 *
 * The followings are the available columns in table 'tbl_modulos':
 * @property integer $mod_id
 * @property string $mod_codigo
 * @property string $mod_detalle
 * @property string $mod_tipob
 * @property integer $mod_estado
 */
class tbl_modulos extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_modulos the static model class
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
		return 'tbl_modulos';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('mod_detalle, mod_tipob, mod_estado', 'required'),
			array('mod_estado', 'numerical', 'integerOnly'=>true),
			array('mod_detalle', 'length', 'max'=>30),
			array('mod_tipob', 'length', 'max'=>6),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('mod_id, mod_codigo, mod_detalle, mod_tipob, mod_estado', 'safe', 'on'=>'search'),
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
			'mod_id' => 'Mod',
			'mod_codigo' => 'Mod Codigo',
			'mod_detalle' => 'Mod Detalle',
			'mod_tipob' => 'Mod Tipob',
			'mod_estado' => 'Mod Estado',
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

		$criteria->compare('mod_id',$this->mod_id);

		$criteria->compare('mod_codigo',$this->mod_codigo,true);

		$criteria->compare('mod_detalle',$this->mod_detalle,true);

		$criteria->compare('mod_tipob',$this->mod_tipob,true);

		$criteria->compare('mod_estado',$this->mod_estado);

		return new CActiveDataProvider('tbl_modulos', array(
			'criteria'=>$criteria,
		));
	}
}