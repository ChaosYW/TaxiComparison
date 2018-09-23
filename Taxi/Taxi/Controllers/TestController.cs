using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Taxi.Models;

namespace Taxi.Controllers
{
    public class TestController : Controller
    {
        private TaxiCompareEntities db = new TaxiCompareEntities();

        // GET: Test
        public ActionResult Index()
        {
            return View(db.TestTable1.ToList());
        }

        // GET: Test/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TestTable1 testTable1 = db.TestTable1.Find(id);
            if (testTable1 == null)
            {
                return HttpNotFound();
            }
            return View(testTable1);
        }

        // GET: Test/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Test/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Description,Price")] TestTable1 testTable1)
        {
            if (ModelState.IsValid)
            {
                db.TestTable1.Add(testTable1);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(testTable1);
        }

        // GET: Test/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TestTable1 testTable1 = db.TestTable1.Find(id);
            if (testTable1 == null)
            {
                return HttpNotFound();
            }
            return View(testTable1);
        }

        // POST: Test/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Description,Price")] TestTable1 testTable1)
        {
            if (ModelState.IsValid)
            {
                db.Entry(testTable1).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(testTable1);
        }

        // GET: Test/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TestTable1 testTable1 = db.TestTable1.Find(id);
            if (testTable1 == null)
            {
                return HttpNotFound();
            }
            return View(testTable1);
        }

        // POST: Test/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TestTable1 testTable1 = db.TestTable1.Find(id);
            db.TestTable1.Remove(testTable1);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
