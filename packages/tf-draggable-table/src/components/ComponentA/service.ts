import request from '@/utils/request';

//汇总统计
export async function getComponentName(data: any): Promise<any> {
  return request('/appApi/getComponentName', {
    method: 'POST',
    data,
    body: data,
  });
}
