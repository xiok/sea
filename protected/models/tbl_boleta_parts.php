<?php

/**
 * This is the model class for table "tbl_boleta_parts".
 *
 * The followings are the available columns in table 'tbl_boleta_parts':
 * @property integer $bpa_id
 * @property string $bpa_codigo
 * @property string $bpa_boleta
 * @property integer $bpa_numparte
 * @property string $bpa_fecini
 * @property string $bpa_fecfin
 * @property string $bpa_user
 * @property string $bpa_script
 * @property string $bpa_obs
 * @property integer $bpa_estado
 */
class tbl_boleta_parts extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_boleta_parts the static model class
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
		return 'tbl_boleta_parts';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('bpa_boleta, bpa_numparte, bpa_fecini, bpa_fecfin, bpa_user, bpa_estado', 'required'),
			array('bpa_numparte, bpa_estado', 'numerical', 'integerOnly'=>true),
			array('bpa_boleta', 'length', 'max'=>6),
			array('bpa_user', 'length', 'max'=>4),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('bpa_id, bpa_codigo, bpa_boleta, bpa_numparte, bpa_fecini, bpa_fecfin, bpa_user, bpa_script, bpa_obs, bpa_estado', 'safe', 'on'=>'search'),
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
			'bol'=>array(self::BELONGS_TO, 'tbl_boleta', array('bpa_boleta'=>'bol_codigo')),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'bpa_id' => 'Bpa',
			'bpa_codigo' => 'Bpa Codigo',
			'bpa_boleta' => 'Bpa Boleta',
			'bpa_numparte' => 'Bpa Numparte',
			'bpa_fecini' => 'Bpa Fecini',
			'bpa_fecfin' => 'Bpa Fecfin',
			'bpa_user' => 'Bpa User',
			'bpa_script' => 'Bpa Script',
			'bpa_obs' => 'Bpa Obs',
			'bpa_estado' => 'Bpa Estado',
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

		$criteria->compare('bpa_id',$this->bpa_id);

		$criteria->compare('bpa_codigo',$this->bpa_codigo,true);

		$criteria->compare('bpa_boleta',$this->bpa_boleta,true);

		$criteria->compare('bpa_numparte',$this->bpa_numparte);

		$criteria->compare('bpa_fecini',$this->bpa_fecini,true);

		$criteria->compare('bpa_fecfin',$this->bpa_fecfin,true);

		$criteria->compare('bpa_user',$this->bpa_user,true);

		$criteria->compare('bpa_script',$this->bpa_script,true);

		$criteria->compare('bpa_obs',$this->bpa_obs,true);

		$criteria->compare('bpa_estado',$this->bpa_estado);

		return new CActiveDataProvider('tbl_boleta_parts', array(
			'criteria'=>$criteria,
		));
	}
}