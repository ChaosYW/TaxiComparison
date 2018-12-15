using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Taxi.Models;
using Microsoft.AspNet.Identity;
using Taxi.DataAccessLayer;

namespace Taxi.Controllers
{
    public class SearchAddressController : Controller
    {
        // GET: SearchAddress
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        // GET: SearchAddress/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SearchAddress/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SearchAddress/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SearchAddress/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SearchAddress/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SearchAddress/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SearchAddress/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [HttpPost]
        public ActionResult saveTaxiOrder(TaxiOrder order)
        {
            // Save selected order pass object to Data Access Layer
            string usernemail = User.Identity.Name;
            order.UserName = usernemail;
            order.SearchDateTime = DateTime.Now;
            TaxiOrderBZ.insertTaxiOrder(order);
            return Json("Success");
        }
    }
}
