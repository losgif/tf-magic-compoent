/**
 * 地区结构
 */
import { isTest } from './utils'

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
 * @summary 查询地区列表
 * @export
 * @interface SelectSubByPcodeRequest
 */
export interface SelectSubByPcodeRequest {
  appId?: string

  /**
   * 父级编码
   * @type {string}
   * @memberOf SelectSubByPcodeRequest
   */
  pCode?: string

  /**
   * 是否过滤市辖区
   * @type {number}
   * @memberOf SelectSubByPcodeRequest
   */
  filterMunicipal?: number

  goNext?: boolean

  includes?: string[]
  excludes?: string[]
}

export interface QueryDistrictRequest {
  appId?: string
  extensions?: 'base' | 'all'
  keywords?: string
  subdistrict?: number
  filterMunicipal?: 0 | 1
  goNext?: boolean
}

export interface QueryAllProvinceRequest {
  appId?: string

  filterSar?: 1 | 0
}

export interface QuerySpecificDistrictsRequest {
  appId?: string
  levels?: 1 | 2
  includes?: string[] | string
  excludes?: string[] | string
  orderBy?: 0 | 1
}

export interface QueryPoiDistrictRequest {
  /**
   * 应用标识
   * @type {string}
   * @memberOf QueryPoiDistrictRequest
   */
  appId?: string

  /**
   * 关键字
   * @type {string}
   * @memberOf QueryPoiDistrictRequest
   */
  keywords?: string

  /**
   * 是否过滤市辖区
   * @type {string}
   * @memberOf QueryPoiDistrictRequest
   */
  filterMunicipal?: number

  /**
   * 级别
   * @type {string}
   * @memberOf QueryPoiDistrictRequest
   */
  level?: number

  maxLevels?: 1 | 2 | 3 | 4
  minLevels?: 1 | 2 | 3 | 4

  skipCount?: number
  pageSize?: number
}

/**
 * @summary POI服务-地址组件-常用城市添加
 * @export
 */
export interface AddFrequencyDistrictRequest {
  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly districtCode?: string

  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly districtName?: string

  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly shortName?: string

  /**
   *
   * @type {number}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly useCount?: number

  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly appId?: string

  /**
   *
   * @type {number}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly partyId?: number

  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly gmtCreate?: string

  /**
   *
   * @type {string}
   * @memberOf AddFrequencyDistrictRequest
   */
  readonly gmtModified?: string
}

/**
 * @summary POI服务-地址组件-常用城市查询
 * @export
 */
export interface QueryFrequencyByConditionsRequest {
  /**
   *
   * @type {string}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly districtCode?: string

  /**
   *
   * @type {string}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly districtName?: string

  /**
   *
   * @type {number}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly partyId?: number

  /**
   *
   * @type {string}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly appId?: string

  /**
   *
   * @type {number}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly minUseCount?: number

  /**
   *
   * @type {number}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly maxUseCount?: number

  /**
   *
   * @type {number}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly skipCount?: number

  /**
   *
   * @type {number}
   * @memberOf QueryFrequencyByConditionsRequest
   */
  readonly pageSize?: number
}

export const Api = {
  async selectSubByPcode (parameters: SelectSubByPcodeRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/selectSubByPcode`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async queryDistrict (parameters: QueryDistrictRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/queryDistrict`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async queryAllProvince (parameters: QueryAllProvinceRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/queryAllProvince`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async querySpecificDistricts (parameters: QuerySpecificDistrictsRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/querySpecificDistricts`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async queryPoiDistrict (parameters: QueryPoiDistrictRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/queryPoiDistrict`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async addFrequencyDistrict (parameters: AddFrequencyDistrictRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/addFrequencyDistrict`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  },

  async queryFrequencyByConditions (parameters: QueryFrequencyByConditionsRequest = {}, options?: any) {
    const url = `https://ditu${ isTest ? 'test' : '' }.tf56.com/ditu/geoCroServicecs/queryFrequencyByConditions`
    const headers: any = {}

    return fetch({
      ...options,
      url,
      method: 'GET',
      data: parameters,
      headers
    }).then(res => res.json())
  }
}
