import { Api } from './api'
import type { District, FrequencyDistrictDTO } from './types'
import React from 'react'

export const ActiveKeyOptions = [
  'common',
  'province',
  'city',
  'area'
] as const

export type ActiveKey = typeof ActiveKeyOptions[number]

export type CommonAddress = FrequencyDistrictDTO

export interface IPopupAddressContext {
  filterMunicipal?: 1 | 0
  showNationalButton?: boolean
  partyId?: number
  mode?: 'search' | 'select'
  depth?: 1 | 2 | 3
  inputValue?: string
}

export const PopupAddressContext = React.createContext<IPopupAddressContext>({})
export const PopupAddressProvider = PopupAddressContext.Provider

/**
 * 一级地区码父级Code
 */
export const defaultPCode = '100000'

let appCode: string = null

/**
 * 获取地区接口数据
 *
 * @param pCode
 * @param filterMunicipal
 */
export const fetchDistricts = (pCode: string, filterMunicipal: 1 | 0 = 1) =>
  Api
    .selectSubByPcode({
      appId: appCode,
      pCode: pCode ?? defaultPCode,
      filterMunicipal
    })
    .then(({ data }) => data)

export const queryDistrict = (parameters) =>
  Api.queryDistrict({
    appId: appCode,
    filterMunicipal: 1,
    ...parameters
  })

/**
 * 获取所有省份接口数据
 *
 * @param hasAllProvince
 * @param filterSar
 */
export const queryAllProvince = (hasAllProvince: boolean, filterSar: 1 | 0 = 1) =>
  Api
    .queryAllProvince({
      appId: appCode,
      filterSar
    })
    .then(({ data }) => {
      // 字母排序 a-g=97-103 h-k=104-107 l-s=108-115 t-z=116-122
      data.sort((a, b) => +(a.pinyin > b.pinyin) || +(a.pinyin === b.pinyin) - 1)
      const options: Record<string, District[]> = {}

      if (hasAllProvince) {
        options['ALL'] = [
          {
            districtCode: defaultPCode,
            fullName: '全国',
            shortName: '全国',
            levels: 0,
            pinyin: 'quanguo'
          }
        ]
      }

      if (filterSar) {
        options['A-G'] = data.slice(0, 8)
        options['H-K'] = data.slice(8, 17)
        options['L-S'] = data.slice(17, 26)
        options['T-Z'] = data.slice(26)
      } else {
        options['A-G'] = data.slice(0, 9)
        options['H-K'] = data.slice(9, 18)
        options['L-S'] = data.slice(18, 27)
        options['T-Z'] = data.slice(27)
      }
      return options
    })

/**
 * 设置常用城市数据
 *
 * @param partyId
 * @param districtCode
 * @param districtName
 */
export const setCommonOptions = (partyId: number, districtCode: string, districtName: string) =>
  Api.addFrequencyDistrict({
    appId: appCode,
    partyId,
    districtCode,
    districtName
  })

/**
 * 获取常用地址数据
 *
 * @param partyId
 */
export const getCommonOptions = (partyId: number) =>
  Api.queryFrequencyByConditions({
    appId: appCode,
    partyId,
    skipCount: 0,
    pageSize: 12
  })

export const queryPoiDistrict = (keywords: string, maxLevels: 1 | 2 | 3 | 4, filterMunicipal: 0 | 1 = 1) =>
  Api.queryPoiDistrict({
    appId: appCode,
    keywords,
    minLevels: 1,
    maxLevels,
    filterMunicipal,
    skipCount: 0,
    pageSize: 20
  })

export const querySpecificDistricts = (code, levels) =>
  Api
    .querySpecificDistricts({
      appId: appCode,
      levels,
      includes: code
    })
    .then(({ data }) => data[0])

/**
 * 查询常用地址完整数据
 *
 * @param districtCode
 */
export const queryCommonDistricts = (districtCode: string) =>
  Promise.all([
    querySpecificDistricts(districtCode.slice(0, 2) + '0000', 1),
    querySpecificDistricts(districtCode, 2)
  ])

export const setGlobalConfig = (
  {
    appCode: _appCode
  }: {
    appCode: string
  }
) => {
  if (_appCode) {
    appCode = _appCode
  }
}
