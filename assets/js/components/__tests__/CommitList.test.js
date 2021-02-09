import React from 'react';
import { shallow } from 'enzyme';
import CommitList from "../CommitList"

test('Click links should update filtering selections', () => {
    const props = {
        commits: [{
            "message": "add github_external_api tests",
            "sha": "4f9ff7c6e4d26dfc50d69c3ddbc49717928a9e92",
            "author": "unknown",
            "url": "https://api.github.com/repos/tuliolages/github-monitor/commits/4f9ff7c6e4d26dfc50d69c3ddbc49717928a9e92",
            "avatar": "",
            "date": "2021-02-06T20:13:56-03:00",
            "repository": {
                "name": "github-monitor",
                "id": 13
            }
        }],
        updateFilters: jest.fn()
    }
    
    const component = shallow(
        <CommitList {...props} />
    );
    
    component.find('a').at(0).simulate('click');

    expect(props.updateFilters).toHaveBeenCalledTimes(1)
    expect(props.updateFilters).toHaveBeenCalledWith({"author": props.commits[0].author})
    
    component.find('a').at(1).simulate('click');

    expect(props.updateFilters).toHaveBeenCalledTimes(2)
    expect(props.updateFilters).toHaveBeenCalledWith({"repository": props.commits[0].repository.id})
});