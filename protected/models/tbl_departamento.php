<?php

/**
 * This is the model class for table "tbl_departamento".
 *
 * The followings are the available columns in table 'tbl_departamento':
 * @property integer $dep_id
 * @property string $dep_codigo
 * @property string $dep_detalle
 * @property integer $dep_estado
 */
class tbl_departamento extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_departamento the static model class
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
		return 'tbl_departamento';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('dep_codigo, dep_detalle, dep_estado', 'required'),
			//array('dep_id, dep_estado', 'numerical', 'integerOnly'=>true),
			array('dep_codigo', 'length', 'max'=>4),
			array('dep_detalle', 'length', 'max'=>25),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, dep_codigo, dep_detalle, dep_estado', 'safe', 'on'=>'search'),
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
            //'muni'=>array(self::HAS_ONE, 'tbl_municipio', 'dep'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'dep_id' => 'Dep Id',
			'dep_codigo' => 'Dep Codigo',
			'dep_detalle' => 'Dep Detalle',
			'dep_estado' => 'Dep Estado',
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

		$criteria->compare('dep_id',$this->dep_id);

		$criteria->compare('dep_codigo',$this->dep_codigo,true);

		$criteria->compare('dep_detalle',$this->dep_detalle,true);

		$criteria->compare('dep_estado',$this->dep_estado);

		return new CActiveDataProvider('tbl_departamento', array(
			'criteria'=>$criteria,
		));
	}
}