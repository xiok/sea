<?php

/**
 * This is the model class for table "tbl_menu".
 *
 * The followings are the available columns in table 'tbl_menu':
 * @property integer $men_id
 * @property string $men_rol
 * @property string $men_detalle
 * @property integer $men_etado
 */
class tbl_menu extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_menu the static model class
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
		return 'tbl_menu';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('men_rol, men_detalle, men_etado', 'required'),
			array('men_etado', 'numerical', 'integerOnly'=>true),
			array('men_rol', 'length', 'max'=>4),
			array('men_detalle', 'length', 'max'=>20),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('men_id, men_rol, men_detalle, men_etado', 'safe', 'on'=>'search'),
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
			'men_id' => 'Men',
			'men_rol' => 'Men Rol',
			'men_detalle' => 'Men Detalle',
			'men_etado' => 'Men Etado',
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

		$criteria->compare('men_id',$this->men_id);

		$criteria->compare('men_rol',$this->men_rol,true);

		$criteria->compare('men_detalle',$this->men_detalle,true);

		$criteria->compare('men_etado',$this->men_etado);

		return new CActiveDataProvider('tbl_menu', array(
			'criteria'=>$criteria,
		));
	}
}