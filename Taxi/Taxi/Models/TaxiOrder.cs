//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Taxi.Models
{
    using System;
    using System.Collections.Generic;
    [Serializable]
    public partial class TaxiOrder
    {
        public int Id { get; set; }
        public System.Guid Product_id { get; set; }
        public string UserName { get; set; }
        public string ServiceName { get; set; }
        public string Price { get; set; }
        public decimal HighPrice { get; set; }
        public decimal LowPrice { get; set; }
        public string CarType { get; set; }
        public double Distance { get; set; }
    }
}
