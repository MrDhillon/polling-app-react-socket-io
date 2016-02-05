import React from 'react';

var Attendence = React.createClass({
  addMemberRow(member,i){
    return(
      <tr key={i}>
        <td>{member.name}</td>
        <td>{member.id}</td>
      </tr>
    );
  },
  render(){
    return(
      <div>
        <h2>Audience - {this.props.audience.length} members</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Audience members</th>
              <th>Socket Id</th>
            </tr>
          </thead>
          <tbody>
            {this.props.audience.map(this.addMemberRow)}
          </tbody>
        </table>
      </div>
      );
  }
});

module.exports = Attendence;
