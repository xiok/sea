<?php

/**
 * This is the model class for table "tbl_asignacion_usuarios".
 *
 * The followings are the available columns in table 'tbl_asignacion_usuarios':
 * @property integer $asigu_id
 * @property integer $asigu_mun
 * @property integer $asigu_usu
 * @property string $asigu_observacion
 */
class tbl_asignacion_usuarios extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return tbl_asignacion_usuarios the static model class
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
		return 'tbl_asignacion_usuarios';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('asigu_mun, asigu_usu', 'required'),
			//array('asigu_mun, asigu_usu', 'numerical', 'integerOnly'=>true),
			array('asigu_observacion', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('asigu_id, asigu_mun, asigu_usu, asigu_observacion', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
    public function primaryKey(){
        return array('asigu_id');
    }
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
			'asigu_id' => 'Asigu',
			'asigu_mun' => 'Asigu Mun',
			'asigu_usu' => 'Asigu Usu',
			'asigu_observacion' => 'Asigu Observacion',
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

		$criteria->compare('asigu_id',$this->asigu_id);
		$criteria->compare('asigu_mun',$this->asigu_mun);
		$criteria->compare('asigu_usu',$this->asigu_usu);
		$criteria->compare('asigu_observacion',$this->asigu_observacion,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}