import React from 'react';
import { connect } from 'react-redux';

const AllocationMainTable = ({ index }) => {
  if (index.length === 0) return null;

  const renderRow = (d) => {
    if (d.name && d.options !== undefined && d.options[0] && d.options[0].value !== undefined) {
      const value = parseFloat(d.options[0].value).toFixed(2);

      return (
        <tr key = { d.name }>
          <td> { d.name } </td>
          <td> <span>{ value }% Cap</span> <span><input type="number"></input></span>
          </td>
        </tr>
      );
    } else {
      console.log(`index data for ${d} has an error!`);
    }
  };

  return (
    <table className="allocation-table">
      <thead>
        <tr>
          <th>Index Crediting Strategied</th>
          <th>1-Year P2P</th>
        </tr>
      </thead>
      <tbody>
        { index.map(d => renderRow(d)) }
      </tbody>
    </table>
  );
};

function mapStateToProps (state) {
  return {
    index: state.Index.index
  };
}

export default connect(mapStateToProps, null)(AllocationMainTable);
