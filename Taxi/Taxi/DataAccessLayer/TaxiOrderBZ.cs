using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Taxi.Models;

namespace Taxi.DataAccessLayer
{
    public class TaxiOrderBZ
    {
        public static void insertTaxiOrder(TaxiOrder order)
        {
            using (TaxiCompareEntities db = new TaxiCompareEntities())
            {
                db.TaxiOrders.Add(order);
                db.SaveChanges();
            }
        }
    }
}