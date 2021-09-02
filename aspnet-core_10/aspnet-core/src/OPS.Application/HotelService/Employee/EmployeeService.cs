using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.Employee.Dto;
using OPS.OPS_Models;

namespace OPS.HotelService.Employee
{
 public class EmployeeService: OPSAppServiceBase
    {
        private readonly IRepository<AddEmployee> _employeeRepository;
        public EmployeeService(IRepository<AddEmployee> addEmployeeRepository)
        {
            this._employeeRepository = addEmployeeRepository;
        }
        [HttpGet]
        public async Task<List<AddEmployee>> getAllEmployee()
        {
            var query = await _employeeRepository.GetAll().ToListAsync();
            if (query != null)
            {
                return query;
            }

            else
            {
                return null;
            }

        }


   [HttpPost]
        public async Task<bool> UpdateEmployee(EmployeeDto input)
        {
            if (input.Id != 0)
            {
                var query = _employeeRepository.Get(input.Id);
                query.Id = input.Id;
                query.FirstName = input.FirstName;
                query.LastName = input.LastName;
                query.EmployeeType = input.EmployeeType;
                query.Age = input.Age;
                query.Gender = input.Gender;
                query.isActive = input.isActive;
                await _employeeRepository.UpdateAsync(query);
                await CurrentUnitOfWork.SaveChangesAsync();
                return true;

            }
            //Insert Employee
            else
            {
                var employee = new AddEmployee();
                employee.FirstName = input.FirstName;
                employee.LastName = input.LastName;
                employee.EmployeeType = input.EmployeeType;
                employee.Age = input.Age;
                employee.Gender = input.Gender;
                employee.isActive = input.isActive;
                await _employeeRepository.InsertAsync(employee);
                return true;
            }
        }
        [HttpDelete]
        public async Task<bool> deleteEmployee(int employeeId)
        {
            var employee =  _employeeRepository.Get(employeeId);
            if (employee != null)
            {
                await _employeeRepository.DeleteAsync(employeeId);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }
    }
}

