<?php

/**
 * This is the model class for table "tbl_gestion".
 *
 * The followings are the available columns in table 'tbl_gestion':
 * @property integer $id
 * @property integer $ges_gestion
 * @property integer $ges_status
 * @property string $ges_type
 * @property integer $ges_estado
 */
class tbl_gestion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_gestion the static model class
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
		return 'tbl_gestion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('ges_gestion, ges_status, ges_type, ges_estado', 'required'),
			array('ges_gestion, ges_status, ges_estado', 'numerical', 'integerOnly'=>true),
			array('ges_type', 'length', 'max'=>2),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, ges_gestion, ges_status, ges_type, ges_estado', 'safe', 'on'=>'search'),
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
			'id' => 'Id',
			'ges_gestion' => 'Ges Gestion',
			'ges_status' => 'Ges Status',
			'ges_type' => 'Ges Type',
			'ges_estado' => 'Ges Estado',
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

		$criteria->compare('id',$this->id);

		$criteria->compare('ges_gestion',$this->ges_gestion);

		$criteria->compare('ges_status',$this->ges_status);

		$criteria->compare('ges_type',$this->ges_type,true);

		$criteria->compare('ges_estado',$this->ges_estado);

		return new CActiveDataProvider('tbl_gestion', array(
			'criteria'=>$criteria,
		));
	}
}