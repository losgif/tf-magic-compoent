/**
 * 地区结构
 */
export interface District {
  districtCode?: string
  fullName?: string
  levels?: number
  pCode?: string
  pinyin?: string
  shortName?: string
  subdistricts?: District[]
}

/**
 * @summary 查询常用地区列表
 * @export
 * @interface FrequencyDistrictDTO
 */
export interface FrequencyDistrictDTO {
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  appId?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  districtCode?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  districtName?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  gmtCreate?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  gmtModified?: string;
  /**
   *
   * @type {number}
   * @memberof FrequencyDistrictDTO
   */
  partyId?: number;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  pcode?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  pname?: string;
  /**
   *
   * @type {string}
   * @memberof FrequencyDistrictDTO
   */
  shortName?: string;
  /**
   *
   * @type {number}
   * @memberof FrequencyDistrictDTO
   */
  useCount?: number;
}
