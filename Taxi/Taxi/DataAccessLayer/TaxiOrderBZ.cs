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
            // open database
            using (TaxiCompareEntities db = new TaxiCompareEntities())
            {
                // insert object
                db.TaxiOrders.Add(order);
                // commit database
                db.SaveChanges();
            } 
        }

        public static IEnumerable<TaxiOrder> getOrderHistorybyUsername(string username)
        {
            //open database
            TaxiCompareEntities db = new TaxiCompareEntities();
            // Select from database
            IEnumerable<TaxiOrder> list =  db.TaxiOrders.Where(a => a.UserName == username).OrderByDescending(a => a.SearchDateTime);

            //Pass data to front end
            return list;
            
        }
    }
}