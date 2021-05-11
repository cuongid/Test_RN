/* eslint-disable import/prefer-default-export */
import request from './request';

export const getUser = (name: string) => request.get(`users/${name}`);

export const getRepository = (name: string, pageIndex: number, pageSize: number) =>
    request.get(`/users/${name}/repos?type=public&page=${pageIndex}&per_page=${pageSize}&sort=public`);
export const getStargazer = (name: string, repositoryName: string, pageIndex: number, pageSize: number) =>
    request.get(`repos/${name}/${repositoryName}/stargazers?page=${pageIndex}&per_page=${pageSize}`);
export const getInformationStargazer = (name: string, repositoryName: string) =>
    request.get(`/repos/${name}/${repositoryName}`);
