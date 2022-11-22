using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    /// <summary>
    /// Represents a result object that stores the status of an HTTP request
    /// </summary>
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};
        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};
    }
}